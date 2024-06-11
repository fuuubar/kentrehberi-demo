using DTO.Results.Core;

namespace DTO.Results;

public class RsPoints : RsGeoBase
{
    public string? Adi { get; set; }
    public string? NgAdi { get; set; }
    public string? Aciklama { get; set; }
    public int? CategoryRefId { get; set; }
    public int? UstKod { get; set; }
    public string? FaaliyetAdi { get; set; }
    public string? NgFaaliyetAdi { get; set; }
    public string? Icon { get; set; }
    public bool? Gizlilik { get; set; }
    public string? Adres { get; set; }
    public int? MahalleRefId { get; set; }
    public int? YolRefId { get; set; }
    public string? TelefonNo { get; set; }
    public string? Kisi { get; set; }
    public string? OnemliYerler { get; set; }
}