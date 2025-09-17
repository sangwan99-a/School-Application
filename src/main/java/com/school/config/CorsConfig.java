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
                "http://localhost:5173",
                "https://school-application-1-1ppn.onrender.com",
                "https://school-application-zs1l.onrender.com",
                "https://school-application-jpuw.onrender.com"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true); // allow credentials for specific origins
            }
        };
    }
}
