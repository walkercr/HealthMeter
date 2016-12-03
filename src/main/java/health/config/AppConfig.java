package health.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * Application configuration.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 12/2/2016
 */
@Configuration
@Import(DBConfig.class)
public class AppConfig extends WebMvcConfigurerAdapter {

    /**
     * Returns a view resolver that resolves string-based views to their
     * respective html files.
     *
     * @return view resolver
     */
    @Bean
    public InternalResourceViewResolver viewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/");
        viewResolver.setSuffix(".html");
        return viewResolver;
    }

    /**
     * Adds a resource handler for front-end build files (i.e. bundle.js, etc.).
     *
     * @param registry resource handler registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/build/");
        super.addResourceHandlers(registry);
    }
}
