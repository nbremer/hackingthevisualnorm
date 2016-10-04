var countries = [
  {
    "Country": "Afghanistan",
    "CountryCode": "AFG",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 15936784437.22,
    "GDP_perCapita": 561.2,
    "lifeExpectancy": 59.60009756
  },
  {
    "Country": "Albania",
    "CountryCode": "ALB",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 11926957254.63,
    "GDP_perCapita": 4094.36,
    "lifeExpectancy": 76.9785122
  },
  {
    "Country": "Algeria",
    "CountryCode": "DZA",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 161207304960.46,
    "GDP_perCapita": 4349.57,
    "lifeExpectancy": 70.61660976
  },
  {
    "Country": "Angola",
    "CountryCode": "AGO",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 82470894868.33,
    "GDP_perCapita": 4218.65,
    "lifeExpectancy": 50.65417073
  },
  {
    "Country": "Antigua and Barbuda",
    "CountryCode": "ATG",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 1135539037.04,
    "GDP_perCapita": 13017.31,
    "lifeExpectancy": 75.33390244
  },
  {
    "Country": "Argentina",
    "CountryCode": "ARG",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 462703793707.19,
    "GDP_perCapita": 11460.38,
    "lifeExpectancy": 75.66356098
  },
  {
    "Country": "Armenia",
    "CountryCode": "ARM",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 9260287416.06,
    "GDP_perCapita": 3124.78,
    "lifeExpectancy": 74.21965854
  },
  {
    "Country": "Aruba",
    "CountryCode": "ABW",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 2467703910.61,
    "GDP_perCapita": 24289.14,
    "lifeExpectancy": 74.95202439
  },
  {
    "Country": "Australia",
    "CountryCode": "AUS",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 1141267760188.09,
    "GDP_perCapita": 51800.93,
    "lifeExpectancy": 81.69512195
  },
  {
    "Country": "Austria",
    "CountryCode": "AUT",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 389656071767.18,
    "GDP_perCapita": 46590.61,
    "lifeExpectancy": 80.5804878
  },
  {
    "Country": "Azerbaijan",
    "CountryCode": "AZE",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 52902703376.11,
    "GDP_perCapita": 5842.81,
    "lifeExpectancy": 70.45029268
  },
  {
    "Country": "Bahamas, The",
    "CountryCode": "BHS",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 7.91e+09,
    "GDP_perCapita": 21941.87,
    "lifeExpectancy": 74.59239024
  },
  {
    "Country": "Bahrain",
    "CountryCode": "BHR",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 25713544824.94,
    "GDP_perCapita": 20545.97,
    "lifeExpectancy": 76.26485366
  },
  {
    "Country": "Bangladesh",
    "CountryCode": "BGD",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 115279077465.23,
    "GDP_perCapita": 762.8,
    "lifeExpectancy": 69.48580488
  },
  {
    "Country": "Barbados",
    "CountryCode": "BRB",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 4433700000,
    "GDP_perCapita": 15812.28,
    "lifeExpectancy": 74.80178049
  },
  {
    "Country": "Belarus",
    "CountryCode": "BLR",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 55220932613.96,
    "GDP_perCapita": 5818.85,
    "lifeExpectancy": 70.40487805
  },
  {
    "Country": "Belgium",
    "CountryCode": "BEL",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 484404271608.09,
    "GDP_perCapita": 44358.26,
    "lifeExpectancy": 80.23414634
  },
  {
    "Country": "Belize",
    "CountryCode": "BLZ",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 1397113450,
    "GDP_perCapita": 4527.34,
    "lifeExpectancy": 73.2704878
  },
  {
    "Country": "Benin",
    "CountryCode": "BEN",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 6561782312.62,
    "GDP_perCapita": 690,
    "lifeExpectancy": 58.74668293
  },
  {
    "Country": "Bermuda",
    "CountryCode": "BMU",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 5744414000,
    "GDP_perCapita": 88207.33,
    "lifeExpectancy": 79.28853659
  },
  {
    "Country": "Bhutan",
    "CountryCode": "BTN",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 1585396256.12,
    "GDP_perCapita": 2211.34,
    "lifeExpectancy": 67.00468293
  },
  {
    "Country": "Bolivia",
    "CountryCode": "BOL",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 19649631308.16,
    "GDP_perCapita": 1934.67,
    "lifeExpectancy": 66.31970732
  },
  {
    "Country": "Bosnia and Herzegovina",
    "CountryCode": "BIH",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 16847493058.85,
    "GDP_perCapita": 4380.6,
    "lifeExpectancy": 75.80668293
  },
  {
    "Country": "Botswana",
    "CountryCode": "BWA",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 13746712711.21,
    "GDP_perCapita": 6980.36,
    "lifeExpectancy": 46.44029268
  },
  {
    "Country": "Brazil",
    "CountryCode": "BRA",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 2143067871759.89,
    "GDP_perCapita": 10978.26,
    "lifeExpectancy": 73.07531707
  },
  {
    "Country": "Brunei Darussalam",
    "CountryCode": "BRN",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 12369708858.9,
    "GDP_perCapita": 30880.34,
    "lifeExpectancy": 77.98865854
  },
  {
    "Country": "Bulgaria",
    "CountryCode": "BGR",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 48669060511.71,
    "GDP_perCapita": 6580.81,
    "lifeExpectancy": 73.51219512
  },
  {
    "Country": "Burkina Faso",
    "CountryCode": "BFA",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 8992678844.36,
    "GDP_perCapita": 578.67,
    "lifeExpectancy": 55.0067561
  },
  {
    "Country": "Burundi",
    "CountryCode": "BDI",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 2026864414.47,
    "GDP_perCapita": 219.53,
    "lifeExpectancy": 52.62402439
  },
  {
    "Country": "Cabo Verde",
    "CountryCode": "CPV",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 1664310632.51,
    "GDP_perCapita": 3413.26,
    "lifeExpectancy": 73.85697561
  },
  {
    "Country": "Cambodia",
    "CountryCode": "KHM",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 11242266333.93,
    "GDP_perCapita": 782.62,
    "lifeExpectancy": 70.64336585
  },
  {
    "Country": "Cameroon",
    "CountryCode": "CMR",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 23622482954.8,
    "GDP_perCapita": 1145.37,
    "lifeExpectancy": 53.69482927
  },
  {
    "Country": "Canada",
    "CountryCode": "CAN",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 1614072093764.07,
    "GDP_perCapita": 47465.35,
    "lifeExpectancy": 80.8934878
  },
  {
    "Country": "Central African Republic",
    "CountryCode": "CAF",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 1986014759.2,
    "GDP_perCapita": 456.56,
    "lifeExpectancy": 48.09873171
  },
  {
    "Country": "Chad",
    "CountryCode": "TCD",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 10657705536.5,
    "GDP_perCapita": 909.3,
    "lifeExpectancy": 49.76985366
  },
  {
    "Country": "Chile",
    "CountryCode": "CHL",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 217501911333.71,
    "GDP_perCapita": 12681.77,
    "lifeExpectancy": 79.05046341
  },
  {
    "Country": "China",
    "CountryCode": "CHN",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 5930502270312.98,
    "GDP_perCapita": 4433.34,
    "lifeExpectancy": 74.88502439
  },
  {
    "Country": "Colombia",
    "CountryCode": "COL",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 287018184637.53,
    "GDP_perCapita": 6179.77,
    "lifeExpectancy": 73.36768293
  },
  {
    "Country": "Comoros",
    "CountryCode": "COM",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 516962949.5,
    "GDP_perCapita": 756.81,
    "lifeExpectancy": 60.20341463
  },
  {
    "Country": "Congo, Rep.",
    "CountryCode": "COG",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 12007880067.44,
    "GDP_perCapita": 2920.41,
    "lifeExpectancy": 57.20402439
  },
  {
    "Country": "Costa Rica",
    "CountryCode": "CRI",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 36298327669.9,
    "GDP_perCapita": 7773.19,
    "lifeExpectancy": 79.27970732
  },
  {
    "Country": "Cote d'Ivoire",
    "CountryCode": "CIV",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 24884503950.68,
    "GDP_perCapita": 1311.33,
    "lifeExpectancy": 49.67529268
  },
  {
    "Country": "Croatia",
    "CountryCode": "HRV",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 59643818181.82,
    "GDP_perCapita": 13500.85,
    "lifeExpectancy": 76.47560976
  },
  {
    "Country": "Cuba",
    "CountryCode": "CUB",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 64328220000,
    "GDP_perCapita": 5701.96,
    "lifeExpectancy": 78.71778049
  },
  {
    "Country": "Cyprus",
    "CountryCode": "CYP",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 23132450331.13,
    "GDP_perCapita": 27889.04,
    "lifeExpectancy": 79.30982927
  },
  {
    "Country": "Czech Republic",
    "CountryCode": "CZE",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 207016402026.36,
    "GDP_perCapita": 19764.02,
    "lifeExpectancy": 77.42439024
  },
  {
    "Country": "Denmark",
    "CountryCode": "DNK",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 319812413596.9,
    "GDP_perCapita": 57647.93,
    "lifeExpectancy": 79.1
  },
  {
    "Country": "Djibouti",
    "CountryCode": "DJI",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 1128611700.36,
    "GDP_perCapita": 1353.19,
    "lifeExpectancy": 60.29119512
  },
  {
    "Country": "Dominican Republic",
    "CountryCode": "DOM",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 53042943731.14,
    "GDP_perCapita": 5295.4,
    "lifeExpectancy": 72.79214634
  },
  {
    "Country": "Ecuador",
    "CountryCode": "ECU",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 69555367000,
    "GDP_perCapita": 4636.69,
    "lifeExpectancy": 75.64770732
  },
  {
    "Country": "Egypt, Arab Rep.",
    "CountryCode": "EGY",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 218887812549.85,
    "GDP_perCapita": 2803.53,
    "lifeExpectancy": 70.45082927
  },
  {
    "Country": "El Salvador",
    "CountryCode": "SLV",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 21418300000,
    "GDP_perCapita": 3444.46,
    "lifeExpectancy": 71.63441463
  },
  {
    "Country": "Equatorial Guinea",
    "CountryCode": "GNQ",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 11582917790.3,
    "GDP_perCapita": 16638.13,
    "lifeExpectancy": 51.53307317
  },
  {
    "Country": "Eritrea",
    "CountryCode": "ERI",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 2117039510.7,
    "GDP_perCapita": 368.75,
    "lifeExpectancy": 61.18509756
  },
  {
    "Country": "Estonia",
    "CountryCode": "EST",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 19479012423.35,
    "GDP_perCapita": 14629.65,
    "lifeExpectancy": 75.42926829
  },
  {
    "Country": "Ethiopia",
    "CountryCode": "ETH",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 29933790334.34,
    "GDP_perCapita": 343.69,
    "lifeExpectancy": 61.46795122
  },
  {
    "Country": "Fiji",
    "CountryCode": "FJI",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 3140508835.95,
    "GDP_perCapita": 3649.38,
    "lifeExpectancy": 69.38231707
  },
  {
    "Country": "Finland",
    "CountryCode": "FIN",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 247799815768.48,
    "GDP_perCapita": 46202.42,
    "lifeExpectancy": 79.87073171
  },
  {
    "Country": "France",
    "CountryCode": "FRA",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 2646837111794.78,
    "GDP_perCapita": 40706.08,
    "lifeExpectancy": 81.66341463
  },
  {
    "Country": "Gabon",
    "CountryCode": "GAB",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 14569527124.62,
    "GDP_perCapita": 9362.11,
    "lifeExpectancy": 62.2897561
  },
  {
    "Country": "Gambia, The",
    "CountryCode": "GMB",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 951827284.92,
    "GDP_perCapita": 566.35,
    "lifeExpectancy": 58.1335122
  },
  {
    "Country": "Georgia",
    "CountryCode": "GEO",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 11638536834.43,
    "GDP_perCapita": 2613.76,
    "lifeExpectancy": 73.67473171
  },
  {
    "Country": "Germany",
    "CountryCode": "DEU",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 3412008772736.86,
    "GDP_perCapita": 41723.37,
    "lifeExpectancy": 79.98780488
  },
  {
    "Country": "Ghana",
    "CountryCode": "GHA",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 32174839712.79,
    "GDP_perCapita": 1326.09,
    "lifeExpectancy": 60.59956098
  },
  {
    "Country": "Greece",
    "CountryCode": "GRC",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 299598056253.27,
    "GDP_perCapita": 26861.46,
    "lifeExpectancy": 80.38780488
  },
  {
    "Country": "Grenada",
    "CountryCode": "GRD",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 771015875.27,
    "GDP_perCapita": 7365.67,
    "lifeExpectancy": 72.33687805
  },
  {
    "Country": "Guatemala",
    "CountryCode": "GTM",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 41337958251.63,
    "GDP_perCapita": 2882.39,
    "lifeExpectancy": 70.99597561
  },
  {
    "Country": "Guinea",
    "CountryCode": "GIN",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 4735956475.83,
    "GDP_perCapita": 435.45,
    "lifeExpectancy": 55.298
  },
  {
    "Country": "Guinea-Bissau",
    "CountryCode": "GNB",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 847491366.89,
    "GDP_perCapita": 534.15,
    "lifeExpectancy": 53.55843902
  },
  {
    "Country": "Guyana",
    "CountryCode": "GUY",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 2259288396.24,
    "GDP_perCapita": 2873.95,
    "lifeExpectancy": 65.7024878
  },
  {
    "Country": "Haiti",
    "CountryCode": "HTI",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 6622541528.57,
    "GDP_perCapita": 669.19,
    "lifeExpectancy": 61.8667561
  },
  {
    "Country": "Honduras",
    "CountryCode": "HND",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 15839344591.98,
    "GDP_perCapita": 2078.33,
    "lifeExpectancy": 72.85031707
  },
  {
    "Country": "Hong Kong SAR, China",
    "CountryCode": "HKG",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 228637697575.04,
    "GDP_perCapita": 32550,
    "lifeExpectancy": 82.97804878
  },
  {
    "Country": "Hungary",
    "CountryCode": "HUN",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 129585601615.85,
    "GDP_perCapita": 12958.53,
    "lifeExpectancy": 74.20731707
  },
  {
    "Country": "Iceland",
    "CountryCode": "ISL",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 13261035516.56,
    "GDP_perCapita": 41695.99,
    "lifeExpectancy": 81.89756098
  },
  {
    "Country": "India",
    "CountryCode": "IND",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 1708458876829.92,
    "GDP_perCapita": 1417.07,
    "lifeExpectancy": 65.6942439
  },
  {
    "Country": "Indonesia",
    "CountryCode": "IDN",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 709190823319.75,
    "GDP_perCapita": 2946.66,
    "lifeExpectancy": 70.16785366
  },
  {
    "Country": "Iran, Islamic Rep.",
    "CountryCode": "IRN",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 422567967404.51,
    "GDP_perCapita": 5674.92,
    "lifeExpectancy": 73.13014634
  },
  {
    "Country": "Iraq",
    "CountryCode": "IRQ",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 138516722649.57,
    "GDP_perCapita": 4473.71,
    "lifeExpectancy": 68.8297561
  },
  {
    "Country": "Ireland",
    "CountryCode": "IRL",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 218435251789.12,
    "GDP_perCapita": 47900.84,
    "lifeExpectancy": 80.74390244
  },
  {
    "Country": "Israel",
    "CountryCode": "ISR",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 232907996790.59,
    "GDP_perCapita": 30550.92,
    "lifeExpectancy": 81.60243902
  },
  {
    "Country": "Italy",
    "CountryCode": "ITA",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 2126620402889.09,
    "GDP_perCapita": 35875.73,
    "lifeExpectancy": 82.03658537
  },
  {
    "Country": "Jamaica",
    "CountryCode": "JAM",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 13230844040.04,
    "GDP_perCapita": 4917.02,
    "lifeExpectancy": 72.84712195
  },
  {
    "Country": "Japan",
    "CountryCode": "JPN",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 5495387182996.1,
    "GDP_perCapita": 42909.25,
    "lifeExpectancy": 82.84268293
  },
  {
    "Country": "Jordan",
    "CountryCode": "JOR",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 26425379436.62,
    "GDP_perCapita": 4370.72,
    "lifeExpectancy": 73.43587805
  },
  {
    "Country": "Kazakhstan",
    "CountryCode": "KAZ",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 148047348240.64,
    "GDP_perCapita": 9070.65,
    "lifeExpectancy": 68.29536585
  },
  {
    "Country": "Kenya",
    "CountryCode": "KEN",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 40000138830.87,
    "GDP_perCapita": 977.78,
    "lifeExpectancy": 59.54707317
  },
  {
    "Country": "Kiribati",
    "CountryCode": "KIR",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 150431113.56,
    "GDP_perCapita": 1539.05,
    "lifeExpectancy": 67.88382927
  },
  {
    "Country": "Korea, Rep.",
    "CountryCode": "KOR",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 1094499350178.46,
    "GDP_perCapita": 22151.21,
    "lifeExpectancy": 80.55121951
  },
  {
    "Country": "Kuwait",
    "CountryCode": "KWT",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 115428557470.18,
    "GDP_perCapita": 38584.48,
    "lifeExpectancy": 74.16192683
  },
  {
    "Country": "Kyrgyz Republic",
    "CountryCode": "KGZ",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 4794357795.07,
    "GDP_perCapita": 880.04,
    "lifeExpectancy": 69.3
  },
  {
    "Country": "Lao PDR",
    "CountryCode": "LAO",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 7181441151.89,
    "GDP_perCapita": 1122.85,
    "lifeExpectancy": 66.89843902
  },
  {
    "Country": "Latvia",
    "CountryCode": "LVA",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 24009680459.99,
    "GDP_perCapita": 11446.51,
    "lifeExpectancy": 73.48292683
  },
  {
    "Country": "Lebanon",
    "CountryCode": "LBN",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 38009950248.76,
    "GDP_perCapita": 8755.85,
    "lifeExpectancy": 79.25278049
  },
  {
    "Country": "Lesotho",
    "CountryCode": "LSO",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 2175692207.16,
    "GDP_perCapita": 1083.02,
    "lifeExpectancy": 47.48341463
  },
  {
    "Country": "Liberia",
    "CountryCode": "LBR",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 1292696475.96,
    "GDP_perCapita": 326.6,
    "lifeExpectancy": 59.43431707
  },
  {
    "Country": "Libya",
    "CountryCode": "LBY",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 74755288916.96,
    "GDP_perCapita": 12375.45,
    "lifeExpectancy": 74.7924878
  },
  {
    "Country": "Lithuania",
    "CountryCode": "LTU",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 36709511568.12,
    "GDP_perCapita": 11852.17,
    "lifeExpectancy": 73.26829268
  },
  {
    "Country": "Luxembourg",
    "CountryCode": "LUX",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 52143650382.99,
    "GDP_perCapita": 102856.97,
    "lifeExpectancy": 80.63170732
  },
  {
    "Country": "Macao SAR, China",
    "CountryCode": "MAC",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 28359706123.1,
    "GDP_perCapita": 53045.88,
    "lifeExpectancy": 79.69295122
  },
  {
    "Country": "Macedonia, FYR",
    "CountryCode": "MKD",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 9338674078.31,
    "GDP_perCapita": 4442.3,
    "lifeExpectancy": 74.72214634
  },
  {
    "Country": "Madagascar",
    "CountryCode": "MDG",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 8729936135.74,
    "GDP_perCapita": 414.14,
    "lifeExpectancy": 63.34973171
  },
  {
    "Country": "Malawi",
    "CountryCode": "MWI",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 5398616984.59,
    "GDP_perCapita": 359.58,
    "lifeExpectancy": 53.46570732
  },
  {
    "Country": "Malaysia",
    "CountryCode": "MYS",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 247533525517.7,
    "GDP_perCapita": 8754.24,
    "lifeExpectancy": 74.49558537
  },
  {
    "Country": "Maldives",
    "CountryCode": "MDV",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 2134104883.7,
    "GDP_perCapita": 6552.48,
    "lifeExpectancy": 76.78631707
  },
  {
    "Country": "Mali",
    "CountryCode": "MLI",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 9422267259.99,
    "GDP_perCapita": 673.69,
    "lifeExpectancy": 53.77073171
  },
  {
    "Country": "Malta",
    "CountryCode": "MLT",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 8163841059.6,
    "GDP_perCapita": 19695.26,
    "lifeExpectancy": 81.39756098
  },
  {
    "Country": "Mauritania",
    "CountryCode": "MRT",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 3526947608.88,
    "GDP_perCapita": 977.15,
    "lifeExpectancy": 61.0232439
  },
  {
    "Country": "Mauritius",
    "CountryCode": "MUS",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 9718233910.68,
    "GDP_perCapita": 7772.1,
    "lifeExpectancy": 72.96731707
  },
  {
    "Country": "Mexico",
    "CountryCode": "MEX",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 1051627949327,
    "GDP_perCapita": 8920.69,
    "lifeExpectancy": 76.69029268
  },
  {
    "Country": "Micronesia, Fed. Sts.",
    "CountryCode": "FSM",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 294117200,
    "GDP_perCapita": 2838.45,
    "lifeExpectancy": 68.62173171
  },
  {
    "Country": "Moldova",
    "CountryCode": "MDA",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 5811604051.97,
    "GDP_perCapita": 1631.54,
    "lifeExpectancy": 68.45812195
  },
  {
    "Country": "Mongolia",
    "CountryCode": "MNG",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 6200357070.11,
    "GDP_perCapita": 2285.65,
    "lifeExpectancy": 66.89460976
  },
  {
    "Country": "Montenegro",
    "CountryCode": "MNE",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 4114881346.94,
    "GDP_perCapita": 6636.07,
    "lifeExpectancy": 74.41673171
  },
  {
    "Country": "Morocco",
    "CountryCode": "MAR",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 90770671431.67,
    "GDP_perCapita": 2822.73,
    "lifeExpectancy": 70.17158537
  },
  {
    "Country": "Mozambique",
    "CountryCode": "MOZ",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 10165353591.17,
    "GDP_perCapita": 424.13,
    "lifeExpectancy": 49.13707317
  },
  {
    "Country": "Namibia",
    "CountryCode": "NAM",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 11281996426.04,
    "GDP_perCapita": 5177.68,
    "lifeExpectancy": 62.48029268
  },
  {
    "Country": "Nepal",
    "CountryCode": "NPL",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 15994094606.97,
    "GDP_perCapita": 595.77,
    "lifeExpectancy": 67.10492683
  },
  {
    "Country": "Netherlands",
    "CountryCode": "NLD",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 836389937229.2,
    "GDP_perCapita": 50338.25,
    "lifeExpectancy": 80.70243902
  },
  {
    "Country": "New Zealand",
    "CountryCode": "NZL",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 143466743661.01,
    "GDP_perCapita": 32975.55,
    "lifeExpectancy": 80.70243902
  },
  {
    "Country": "Nicaragua",
    "CountryCode": "NIC",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 8938209651.44,
    "GDP_perCapita": 1535.19,
    "lifeExpectancy": 73.79512195
  },
  {
    "Country": "Niger",
    "CountryCode": "NER",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 5718589550.16,
    "GDP_perCapita": 359.8,
    "lifeExpectancy": 56.98563415
  },
  {
    "Country": "Nigeria",
    "CountryCode": "NGA",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 369062403181.95,
    "GDP_perCapita": 2310.86,
    "lifeExpectancy": 51.28941463
  },
  {
    "Country": "Norway",
    "CountryCode": "NOR",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 420945705225.42,
    "GDP_perCapita": 86096.14,
    "lifeExpectancy": 80.99756098
  },
  {
    "Country": "Oman",
    "CountryCode": "OMN",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 58641352878.43,
    "GDP_perCapita": 20922.66,
    "lifeExpectancy": 76.04580488
  },
  {
    "Country": "Pakistan",
    "CountryCode": "PAK",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 177165635077.07,
    "GDP_perCapita": 1023.2,
    "lifeExpectancy": 66.12634146
  },
  {
    "Country": "Panama",
    "CountryCode": "PAN",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 28814100000,
    "GDP_perCapita": 7833.9,
    "lifeExpectancy": 76.94870732
  },
  {
    "Country": "Papua New Guinea",
    "CountryCode": "PNG",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 9717175432.14,
    "GDP_perCapita": 1416.72,
    "lifeExpectancy": 62.00780488
  },
  {
    "Country": "Paraguay",
    "CountryCode": "PRY",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 20030529733.44,
    "GDP_perCapita": 3100.84,
    "lifeExpectancy": 72.02665854
  },
  {
    "Country": "Peru",
    "CountryCode": "PER",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 148522810971.5,
    "GDP_perCapita": 5075.48,
    "lifeExpectancy": 73.90509756
  },
  {
    "Country": "Philippines",
    "CountryCode": "PHL",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 199589447424.07,
    "GDP_perCapita": 2135.92,
    "lifeExpectancy": 68.23026829
  },
  {
    "Country": "Poland",
    "CountryCode": "POL",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 476687891752.07,
    "GDP_perCapita": 12484.07,
    "lifeExpectancy": 76.24634146
  },
  {
    "Country": "Portugal",
    "CountryCode": "PRT",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 238303443425.21,
    "GDP_perCapita": 22538.65,
    "lifeExpectancy": 79.02682927
  },
  {
    "Country": "Qatar",
    "CountryCode": "QAT",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 125122249141.25,
    "GDP_perCapita": 71510.16,
    "lifeExpectancy": 78.14604878
  },
  {
    "Country": "Russian Federation",
    "CountryCode": "RUS",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 1524916112078.87,
    "GDP_perCapita": 10709.77,
    "lifeExpectancy": 68.85609756
  },
  {
    "Country": "Rwanda",
    "CountryCode": "RWA",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 5698548923.48,
    "GDP_perCapita": 525.85,
    "lifeExpectancy": 62.21214634
  },
  {
    "Country": "Samoa",
    "CountryCode": "WSM",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 643059403.01,
    "GDP_perCapita": 3456.77,
    "lifeExpectancy": 72.40802439
  },
  {
    "Country": "Sao Tome and Principe",
    "CountryCode": "STP",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 201037916.58,
    "GDP_perCapita": 1127.98,
    "lifeExpectancy": 65.85368293
  },
  {
    "Country": "Saudi Arabia",
    "CountryCode": "SAU",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 526811466666.67,
    "GDP_perCapita": 19326.58,
    "lifeExpectancy": 75.07560976
  },
  {
    "Country": "Senegal",
    "CountryCode": "SEN",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 12932427724.32,
    "GDP_perCapita": 998.6,
    "lifeExpectancy": 62.84187805
  },
  {
    "Country": "Serbia",
    "CountryCode": "SRB",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 39368633038.12,
    "GDP_perCapita": 5399.3,
    "lifeExpectancy": 74.33658537
  },
  {
    "Country": "Seychelles",
    "CountryCode": "SYC",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 973360306.52,
    "GDP_perCapita": 10842.82,
    "lifeExpectancy": 73.19756098
  },
  {
    "Country": "Sierra Leone",
    "CountryCode": "SLE",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 2578159495.56,
    "GDP_perCapita": 448.22,
    "lifeExpectancy": 44.83895122
  },
  {
    "Country": "Singapore",
    "CountryCode": "SGP",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 236420337242.78,
    "GDP_perCapita": 46569.69,
    "lifeExpectancy": 81.54146341
  },
  {
    "Country": "Slovak Republic",
    "CountryCode": "SVK",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 89011919205.3,
    "GDP_perCapita": 16509.9,
    "lifeExpectancy": 75.11219512
  },
  {
    "Country": "Slovenia",
    "CountryCode": "SVN",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 47972988741.72,
    "GDP_perCapita": 23417.64,
    "lifeExpectancy": 79.42195122
  },
  {
    "Country": "Solomon Islands",
    "CountryCode": "SLB",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 681587104.77,
    "GDP_perCapita": 1294.69,
    "lifeExpectancy": 67.06665854
  },
  {
    "Country": "South Africa",
    "CountryCode": "ZAF",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 375349442837.19,
    "GDP_perCapita": 7389.96,
    "lifeExpectancy": 54.3907561
  },
  {
    "Country": "Spain",
    "CountryCode": "ESP",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 1431587612302.26,
    "GDP_perCapita": 30736,
    "lifeExpectancy": 81.62682927
  },
  {
    "Country": "Sri Lanka",
    "CountryCode": "LKA",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 49567521669.91,
    "GDP_perCapita": 2400.02,
    "lifeExpectancy": 73.75526829
  },
  {
    "Country": "St. Lucia",
    "CountryCode": "LCA",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 1244297407.41,
    "GDP_perCapita": 7014.2,
    "lifeExpectancy": 74.41102439
  },
  {
    "Country": "St. Vincent and the Grenadines",
    "CountryCode": "VCT",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 681225962.96,
    "GDP_perCapita": 6231.71,
    "lifeExpectancy": 72.18492683
  },
  {
    "Country": "Sudan",
    "CountryCode": "SDN",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 65632081240.3,
    "GDP_perCapita": 1439.52,
    "lifeExpectancy": 61.47829268
  },
  {
    "Country": "Suriname",
    "CountryCode": "SUR",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 4368398047.64,
    "GDP_perCapita": 8321.39,
    "lifeExpectancy": 70.33582927
  },
  {
    "Country": "Swaziland",
    "CountryCode": "SWZ",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 3891575151.61,
    "GDP_perCapita": 3261.6,
    "lifeExpectancy": 48.3457561
  },
  {
    "Country": "Sweden",
    "CountryCode": "SWE",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 488377689564.92,
    "GDP_perCapita": 52076.26,
    "lifeExpectancy": 81.45121951
  },
  {
    "Country": "Switzerland",
    "CountryCode": "CHE",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 581208562423.37,
    "GDP_perCapita": 74276.72,
    "lifeExpectancy": 82.24634146
  },
  {
    "Country": "Tajikistan",
    "CountryCode": "TJK",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 5642178579.58,
    "GDP_perCapita": 739.73,
    "lifeExpectancy": 66.9955122
  },
  {
    "Country": "Tanzania",
    "CountryCode": "TZA",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 30917376837.12,
    "GDP_perCapita": 707.93,
    "lifeExpectancy": 59.18170732
  },
  {
    "Country": "Thailand",
    "CountryCode": "THA",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 318907930075.71,
    "GDP_perCapita": 4802.66,
    "lifeExpectancy": 73.81378049
  },
  {
    "Country": "Togo",
    "CountryCode": "TGO",
    "Region": "Africa | South & West",
    "Continent": "Africa",
    "GDP": 3172945506.36,
    "GDP_perCapita": 503.16,
    "lifeExpectancy": 55.46887805
  },
  {
    "Country": "Tonga",
    "CountryCode": "TON",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 369212477.46,
    "GDP_perCapita": 3546.78,
    "lifeExpectancy": 72.18263415
  },
  {
    "Country": "Trinidad and Tobago",
    "CountryCode": "TTO",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 20758191857.98,
    "GDP_perCapita": 15630.05,
    "lifeExpectancy": 69.59736585
  },
  {
    "Country": "Tunisia",
    "CountryCode": "TUN",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 44426016487.36,
    "GDP_perCapita": 4212.15,
    "lifeExpectancy": 74.60243902
  },
  {
    "Country": "Turkey",
    "CountryCode": "TUR",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 731168051903.11,
    "GDP_perCapita": 10135.75,
    "lifeExpectancy": 74.21119512
  },
  {
    "Country": "Turkmenistan",
    "CountryCode": "TKM",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 22148070175.44,
    "GDP_perCapita": 4392.72,
    "lifeExpectancy": 65.01821951
  },
  {
    "Country": "Uganda",
    "CountryCode": "UGA",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 18803852465.55,
    "GDP_perCapita": 553.26,
    "lifeExpectancy": 57.29653659
  },
  {
    "Country": "Ukraine",
    "CountryCode": "UKR",
    "Region": "Europe | South & East",
    "Continent": "Europe",
    "GDP": 136419300367.96,
    "GDP_perCapita": 2974,
    "lifeExpectancy": 70.26536585
  },
  {
    "Country": "United Arab Emirates",
    "CountryCode": "ARE",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 286049293398.98,
    "GDP_perCapita": 33885.93,
    "lifeExpectancy": 76.59860976
  },
  {
    "Country": "United Kingdom",
    "CountryCode": "GBR",
    "Region": "Europe | North & West",
    "Continent": "Europe",
    "GDP": 2407933767804.59,
    "GDP_perCapita": 38363.44,
    "lifeExpectancy": 80.40243902
  },
  {
    "Country": "United States",
    "CountryCode": "USA",
    "Region": "America | North & Central",
    "Continent": "Americas",
    "GDP": 1.49644e+13,
    "GDP_perCapita": 48377.39,
    "lifeExpectancy": 78.54146341
  },
  {
    "Country": "Uruguay",
    "CountryCode": "URY",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 38881102099.88,
    "GDP_perCapita": 11530.64,
    "lifeExpectancy": 76.61621951
  },
  {
    "Country": "Uzbekistan",
    "CountryCode": "UZB",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 39332770928.94,
    "GDP_perCapita": 1377.08,
    "lifeExpectancy": 67.8587561
  },
  {
    "Country": "Vanuatu",
    "CountryCode": "VUT",
    "Region": "Oceania",
    "Continent": "Oceania",
    "GDP": 700804286.22,
    "GDP_perCapita": 2965.75,
    "lifeExpectancy": 70.83890244
  },
  {
    "Country": "Venezuela, RB",
    "CountryCode": "VEN",
    "Region": "America | South",
    "Continent": "Americas",
    "GDP": 393801556872.31,
    "GDP_perCapita": 13559.13,
    "lifeExpectancy": 74.17046341
  },
  {
    "Country": "Vietnam",
    "CountryCode": "VNM",
    "Region": "Asia | East & Central",
    "Continent": "Asia",
    "GDP": 115931749904.86,
    "GDP_perCapita": 1333.58,
    "lifeExpectancy": 75.31173171
  },
  {
    "Country": "Yemen, Rep.",
    "CountryCode": "YEM",
    "Region": "Asia | South & West",
    "Continent": "Asia",
    "GDP": 31743751169.32,
    "GDP_perCapita": 1394.53,
    "lifeExpectancy": 62.52765854
  },
  {
    "Country": "Zambia",
    "CountryCode": "ZMB",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 20265396325.59,
    "GDP_perCapita": 1533.28,
    "lifeExpectancy": 54.52756098
  },
  {
    "Country": "Zimbabwe",
    "CountryCode": "ZWE",
    "Region": "Africa | North & East",
    "Continent": "Africa",
    "GDP": 9456808200,
    "GDP_perCapita": 723.16,
    "lifeExpectancy": 53.59312195
  }
];