package com.school.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
    .allowedOrigins("https://school-application-1-2kpo.onrender.com", "http://localhost:5173") // replace with your actual frontend URL
    .allowedMethods("*")
    .allowedHeaders("*")
    .allowCredentials(true);
            }
        };
    }
}
