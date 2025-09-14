package com.school.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class CorsConfig {

    @Bean(name = "customCorsConfigurer")
    public WebMvcConfigurer customCorsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**") // allow all endpoints
            .allowedOrigins(
                "https://school-application-1-1ppn.onrender.com",
                "http://localhost:8080",
                "http://localhost:3000",
                "http://localhost:5173"
            ) // React frontend and deployed frontend
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
            }
        };
    }
}
