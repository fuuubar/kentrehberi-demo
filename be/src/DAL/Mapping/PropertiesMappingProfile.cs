using DAL.Entities;
using DAL.Mapping.Core;
using DTO.Results;

namespace DAL.Mapping;

public class PropertiesMappingProfile : BaseGeoMappingProfile<Properties, RsProperties, PropertyAttributes>
{
    public PropertiesMappingProfile() : base()
    {
        CreateMap<PropertyAttributes, RsProperties>();
        CreateMap<Properties, RsProperties>()
            .IncludeMembers(src => src.attributes)
            .ForMember(dest => dest.Wkt, opt => opt.MapFrom(src => GetWktString(src.geometry)));
    }
}
