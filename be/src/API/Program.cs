var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton(NetTopologySuite.NtsGeometryServices.Instance);
builder.Services.AddScoped<DAL.DataAccess.Core.IDAL, DAL.DataAccess.Core.DAL>();
builder.Services.AddScoped<BLL.Logics.Core.IBLL, BLL.Logics.Core.BLL>();
builder.Services.AddAutoMapper(System.Reflection.Assembly.GetAssembly(typeof(DAL.DataAccess.Core.DAL)));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCorsOnDevelopment",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowCorsOnDevelopment");
}

app.UseAuthorization();
app.MapControllers();

app.Run();
