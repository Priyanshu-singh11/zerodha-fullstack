package data

var Watchlist = []map[string]interface{}{
	{
		"name":    "INFY",
		"price":   1555.45,
		"percent": "-1.60%",
		"isDown":  true,
	},
	{
		"name":    "ONGC",
		"price":   116.80,
		"percent": "-0.09%",
		"isDown":  true,
	},
	{
		"name":    "TCS",
		"price":   3194.80,
		"percent": "-0.25%",
		"isDown":  true,
	},
	{
		"name":    "RELIANCE",
		"price":   2112.40,
		"percent": "1.44%",
		"isDown":  false,
	},
}

var Holdings = []map[string]interface{}{
	{
		"name":  "BHARTIARTL",
		"qty":   2,
		"avg":   538.05,
		"price": 541.15,
		"net":   "+0.58%",
		"day":   "+2.99%",
	},
	{
		"name":  "HDFCBANK",
		"qty":   2,
		"avg":   1383.40,
		"price": 1522.35,
		"net":   "+10.04%",
		"day":   "+0.11%",
	},
}

var Positions = []map[string]interface{}{
	{
		"product": "CNC",
		"name":    "EVEREADY",
		"qty":     2,
		"avg":     316.27,
		"price":   312.35,
		"net":     "+0.58%",
		"day":     "-1.24%",
		"isLoss":  true,
	},
}