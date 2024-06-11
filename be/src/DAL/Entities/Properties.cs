using DAL.Entities.Core;

namespace DAL.Entities;

public class Properties : BaseGeoEntity
{
    public new PropertyAttributes attributes { get; set; }

}

public class PropertyAttributes : BaseAttributes
{
    public int? objectid { get; set; }
    public string? yapi_adi { get; set; }
    public string? ng_yapi_adi { get; set; }
    public double? tabanalani { get; set; }
    public int? katadedi { get; set; }
    public int? normal_kat { get; set; }
    public int? bodrum_kat { get; set; }
    public int? cati_kati { get; set; }
    public string? aciklama { get; set; }
    public string? site_adi { get; set; }
    public string? ng_site_adi { get; set; }
    public bool? geo_durum { get; set; }
    public DateTime? m_date { get; set; }
}