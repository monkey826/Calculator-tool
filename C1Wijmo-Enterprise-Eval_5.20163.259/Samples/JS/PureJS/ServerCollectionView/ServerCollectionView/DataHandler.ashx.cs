using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace ServerCollectionView
{
    /// <summary>
    /// Simple data service used to show how to implement custom
    /// wijmo.collections.CollectionView classes that work against
    /// generic data services.
    /// 
    /// This service accepts requests of the form 
    /// 
    /// 'DataHandler.asx?$orderby=p1,p2 desc&$skip=5&$top=10'
    /// 
    /// Where the optional parameters specify the sort, records
    /// to skip, and number or records to include in the response.
    /// (The parameter names and format are the same as in OData)
    /// 
    /// This service does not support filtering, or writing.
    /// 
    /// It uses a list with 1000 Person objects as the raw data
    /// source.
    /// 
    /// The return value is a JSON string in this format 
    /// (same as in OData):
    /// 
    /// {
    ///   context: request url,
    ///   count: total number of records (always 1000)
    ///   value: array with the requested data 
    /// }
    /// </summary>
    public class DataHandler : IHttpHandler
    {
        List<object> _customers;

        public void ProcessRequest(HttpContext context)
        {
            // get raw data
            if (_customers == null)
            {
                _customers = new List<object>();
                for (var i = 0; i < 1000; i++) {
                    _customers.Add(new Customer(i));
                }
            }

            // start with the whole data set
            var view = _customers;

            // apply sort
            // $orderby=Rating,CategoryName desc
            var sort = context.Request.Params["$orderby"];
            if (sort != null)
            {
                view = new List<object>();
                foreach (var p in _customers)
                {
                    view.Add(p);
                }
                view.Sort(new Comparer(sort));
            }

            // apply paging
            var skip = context.Request.Params["$skip"];
            var top = context.Request.Params["$top"];
            if (skip != null || top != null)
            {
                var start = 0;
                var len = view.Count;
                int.TryParse(skip, out start);
                int.TryParse(top, out len);
                var page = new List<object>();
                for (var i = start; i < view.Count && i < start + len; i++)
                {
                    page.Add(view[i]);
                }
                view = page;
            }

            // serialize the output
            var ov = new OutputValue();
            ov.context = context.Request.Url.PathAndQuery;
            ov.count = _customers.Count;
            ov.value = view;
            var serializer = new JavaScriptSerializer();
            var output = serializer.Serialize(ov);

            // write it out
            context.Response.ContentType = "application/json";
            context.Response.Write(output);
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }

    // object used to return the results (like OData)
    public class OutputValue
    {
        public string context { get; set;  }
        public int count { get; set;  }
        public IList<object> value { get; set; }
    }

    // sort utilities
    public class SortDescription
    {
        public string Property { get; set; }
        public bool Ascending { get; set; }
    }
    public class Comparer : IComparer<object>
    {
        List<SortDescription> _sd = new List<SortDescription>();

        // $orderby=Rating,CategoryName desc
        public Comparer(string sort)
        {
            var fields = sort.Split(',');
            for (var i = 0; i < fields.Length; i++)
            {
                var f = fields[i].Trim().Split(' ');
                var sd = new SortDescription();
                sd.Property = f[0];
                sd.Ascending = (f.Length < 2 || string.Compare(f[1], "desc", true) != 0);
                _sd.Add(sd);
            }
        }
        public int Compare(object o1, object o2)
        {
            foreach (var sd in this._sd)
            {
                var pi = o1.GetType().GetProperty(sd.Property);
                var v1 = pi.GetValue(o1) as IComparable;
                var v2 = pi.GetValue(o2) as IComparable;
                if (v1 != null && v2 != null)
                {
                    var cmp = v1.CompareTo(v2);
                    if (cmp != 0)
                    {
                        return (sd.Ascending) ? +cmp : -cmp;
                    }
                }
            }
            return 0;
        }
    }

    // our data class
    public class Customer
    {
        static string[] _fnames = "Paul,Bob,Joe,Mark".Split(',');
        static string[] _lnames = "Smith,Paulson,McNamara".Split(',');
        static Random _rnd = new Random();

        public Customer(int i)
        {
            this.ID = i;
            this.FirstName = _fnames[i % _fnames.Length];
            this.LastName = _lnames[i % _lnames.Length];
            this.Amount = _rnd.NextDouble() * 1000;
            this.Active = i % 5 != 0;
            this.Since = DateTime.Now.AddDays(_rnd.Next(365));
        }
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double Amount { get; set; }
        public bool Active { get; set; }
        public DateTime Since { get; set; }
    }
}