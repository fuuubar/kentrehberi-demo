using AutoMapper;

namespace DAL.Mapping.Core;

public static class MapperInitializer
{
    public static IMapper Initialize()
    {
        var mappingConfig = new MapperConfiguration(cfg =>
        {
            cfg.SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
            cfg.DestinationMemberNamingConvention = new PascalCaseNamingConvention();
            cfg.AddProfile<PointsMappingProfile>();
            cfg.AddProfile<PropertiesMappingProfile>();
        });

        mappingConfig.AssertConfigurationIsValid();

        return mappingConfig.CreateMapper();
    }
}
