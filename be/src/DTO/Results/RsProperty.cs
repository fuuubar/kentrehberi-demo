using DTO.Results.Core;

namespace DTO.Results;

public class RsProperties : RsGeoBase
{
    public string? YapiAdi { get; set; }
    public string? NgYapiAdi { get; set; }
    public double? TabanAlani { get; set; }
    public int? NormalKat { get; set; }
    public int? BodrumKat { get; set; }
    public int? CatiKati { get; set; }
    public string? Aciklama { get; set; }
    public string? NgSiteAdi { get; set; }
    public DateTime? MDate { get; set; }
}