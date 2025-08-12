namespace bolig_swipe_backend;

public record Apartment(
    int id,
    double latitude,
    double longitude,
    int propertyType,
    int priceChangePercentTotal,
    string energyClass,
    string openHouse,
    int price,
    bool selfsale,
    double rooms,
    int size,
    int lotSize,
    int? floor,
    int buildYear,
    string city,
    bool isForeclosure,
    bool isActive,
    int municipality,
    int zipCode,
    string street,
    double squaremeterPrice,
    int area,
    int daysForSale,
    DateTime createdDate,
    bool isPremiumAgent,
    List<Image> images,
    int net,
    int exp,
    int basementSize,
    bool inWatchlist,
    int views,
    int agentRegId,
    int domainId,
    Guid guid,
    string agentDisplayName,
    string? groupKey,
    int downPayment,
    int itemType
);

public record Image(int id, DateTime date, string url);

public record ApartmentResponse(
    Meta meta,
    List<Apartment> results
);

public record Meta(
    string searchGuid,
    int totalCount,
    int totalPages,
    int pageIndex,
    int pageSize,
    int minPage,
    int maxPage,
    bool showBanners
);
