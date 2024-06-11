using DAL.Entities;
using DAL.Mapping.Core;
using DTO.Results;

namespace DAL.Mapping;

public class PointsMappingProfile : BaseGeoMappingProfile<Points, RsPoints, PointAttributes>
{
    public PointsMappingProfile() : base()
    {
        CreateMap<PointAttributes, RsPoints>()
            .ForMember(dest => dest.CategoryRefId, opt => opt.MapFrom(src => src.category))
            .ForMember(dest => dest.MahalleRefId, opt => opt.MapFrom(src => src.mahalle_id))
            .ForMember(dest => dest.YolRefId, opt => opt.MapFrom(src => src.yol_id));
        CreateMap<Points, RsPoints>()
            .IncludeMembers(src => src.attributes)
            .ForMember(dest => dest.Wkt, opt => opt.MapFrom(src => GetWktString(src.geometry)));
    }
}
