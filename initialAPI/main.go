package main

import (
	"github.com/gin-gonic/gin"
	"initialAPI/routes"
)

func main() {

	router := gin.Default()

	routes.SetupRoutes(router)

	router.Run(":8000")
}