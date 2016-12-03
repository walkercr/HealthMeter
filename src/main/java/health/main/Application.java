package health.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * Application entry point.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 12/2/2016
 */
@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
@ComponentScan("health")
public class Application {

    /**
     * Main method.
     * @param args program arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
