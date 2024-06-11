using DAL.Entities.Core;

namespace DAL.Entities;

public class Points : BaseGeoEntity
{
    public new PointAttributes attributes { get; set; }

}

public class PointAttributes : BaseAttributes
{
    public string? objectid { get; set; }
    public string? adi { get; set; }
    public string? ng_adi { get; set; }
    public string? aciklama { get; set; }
    public int? category { get; set; }
    public int? ustkod { get; set; }
    public string? faaliyet_adi { get; set; }
    public string? ng_faaliyet_adi { get; set; }
    public string? icon { get; set; }
    public bool? gizlilik { get; set; }
    public string? adres { get; set; }
    public int? mahalle_id { get; set; }
    public int? yol_id { get; set; }
    public string? telefon_no { get; set; }
    public string? kisi { get; set; }
    public string? onemliyerler { get; set; }
    public bool? geo_durum { get; set; }
}