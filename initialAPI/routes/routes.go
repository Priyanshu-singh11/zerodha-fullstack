package routes

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"initialAPI/data"
	"initialAPI/handlers"
)

func SetupRoutes(r *gin.Engine) {

	// Home Route
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"success": true,
			"message": "Zerodha API Running",
			
		})
	})

	r.GET("/api", func(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"success":   true,
		"name":      "Zerodha Clone API",
		"version":   "v1",
		"status":    "running",
		"timestamp": time.Now().UTC(),
		"endpoints": gin.H{
			"watchlist": "/api/watchlist",
			"holdings":  "/api/holdings",
			"positions": "/api/positions",
		},
	})
})

	api := r.Group("/api")

	{
		api.GET("/watchlist", func(c *gin.Context) {
			c.JSON(http.StatusOK, data.Watchlist)
		})

		api.GET("/holdings", func(c *gin.Context) {
			c.JSON(http.StatusOK, data.Holdings)
		})

		api.GET("/positions", func(c *gin.Context) {
			c.JSON(http.StatusOK, data.Positions)
		})
	}

	// Catch all unknown routes
	r.NoRoute(handlers.NotFound)
}