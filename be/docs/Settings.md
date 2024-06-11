# Ayarlar

## Ayar Dosyaları

Uygulama ayarları /src/API klasörü içinde bulunmaktadır.
	- appsettings.json
	- appsettings.{environmentType}.json
	- Properties/launchSettings.json

Sanal Makine üzerinde çalıştığım için, şuanda bu uygulama ayağa kalktığında tüm adreslerde 5069 portunu dinlemektedir. Bu adresler localhost olarak değiştirilebilir.

Aynı nedenle eğer ASPNET_ENVIRONMENT development ise CORS açıktır.

## Uygulamanın Ayağa Kaldırılması

Uygulama VS Code üzerinde geliştirildi ve dotnet CLI'nin yardımı ile derlendi.
Dotnet Solution dosyası (.sln) güncellenmiş olup Visual Studio'da da çalışmaması için bir engel bulunmamaktadır.

## Ortam Değişkenleri 

dotnet CLI versiyon 7.0.410
