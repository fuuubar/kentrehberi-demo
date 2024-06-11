# Ayarlar


## Ayar Dosyaları

Ayar dosyaları /src içindeki ilgili dosyalardır.
	- .env.{environmentType}
	- .prettierrc
	- package.json
	- tsconfig

Sanal Makineler üzerinde çalıştığım için .env.local dosyasında HOST=0.0.0.0 ayarı yer almaktadır.
Sadece localhost yapmak için bunun silinmesi yeterlidir.

Port bilgisi'de yine .env.local dosyasında yer almakta olup, değiştirilebilir.
Şuanki PORT=8000 'dir.

REACT_APP_BE_BASE_URL , backend uygulamasının erişilebileceği adresi içermelidir.


## Uygulamanın Ayağa Kaldırılması

Uygulamayı debug mode'da ayağa kaldırmak için (package.json içerisinde yer alan script) 
	`npm run debug` komutu çalıştırılabilir.


## Ortam Değişkenleri 

Uygulama node versiyonu 16.14.2 ve npm versiyonu 8.5.0 ile yazılmıştır.
