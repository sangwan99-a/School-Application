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
         registry.addMapping("/**")
            .allowedOriginPatterns("*") // allow all origins
            .allowedMethods("*") // allow all HTTP methods
            .allowedHeaders("*") // allow all headers
            .allowCredentials(true); // allow credentials for all origins
            }
        };
    }
}
