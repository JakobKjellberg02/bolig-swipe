using System.Text.Json;
using bolig_swipe_backend;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("http://localhost:5173");
        });
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var tempJSON = File.ReadAllText("results.json");
var apartmentResponse = JsonSerializer.Deserialize<ApartmentResponse>(tempJSON);
var apartments = apartmentResponse?.results;

app.MapGet("/apartments/random", () =>
    {
        var randomApartment = apartments?[Random.Shared.Next(apartments.Count)];
        return randomApartment;
    })
    .WithName("GetRandomApartment");

app.Run();

