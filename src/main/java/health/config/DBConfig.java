package health.config;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

import health.dao.IUserDao;
import health.dao.UserDao;
import health.model.User;
import health.services.IUserService;
import health.services.UserService;
import org.apache.commons.dbcp2.BasicDataSource;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Database configuration.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 12/2/2016
 */
@Configuration
@EnableTransactionManagement
public class DBConfig {

    /**
     * Returns a hibernate transaction manager that manages database
     * transactions.
     * @return hibernate transaction manager
     * @throws IOException if an I/O error occurs
     */
    @Bean
    public HibernateTransactionManager transactionManager() throws IOException {
        HibernateTransactionManager txMgr = new HibernateTransactionManager();
        txMgr.setSessionFactory(sessionFactory());
        txMgr.afterPropertiesSet();
        return txMgr;
    }

    /**
     * Returns a session factory that provides database sessions.
     * @return session factory
     * @throws IOException if an I/O error occurs
     */
    @Bean
    public SessionFactory sessionFactory() throws IOException {
        LocalSessionFactoryBean bean = new LocalSessionFactoryBean();
        bean.setDataSource(dataSource());
        bean.setHibernateProperties(hibernateProperties());
        bean.setPackagesToScan("health.model");
        bean.setAnnotatedClasses(
                User.class
        );
        bean.afterPropertiesSet();
        return bean.getObject();
    }

    /**
     * Returns a data source used to access the database.
     * @return database data source
     */
    @Bean
    public DataSource dataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/healthmeter");
        dataSource.setUsername("root");
        dataSource.setPassword("Caiden_14");
        return dataSource;
    }

    /**
     * Returns hibernate properties specific to application database.
     * @return hibernate properties
     */
    private static Properties hibernateProperties() {
        Properties props = new Properties();
        props.setProperty("hibernate.dialect",
                "org.hibernate.dialect.MySQL5Dialect");
        props.setProperty("hibernate.show_sql", "true");
        return props;
    }

    /**
     * Returns a data access object for the User table.
     * @return User data access object
     * @throws IOException if an I/O error occurs
     */
    @Bean
    public IUserDao userDao() throws IOException {
        return new UserDao(sessionFactory());
    }

    /**
     * Returns a user service provider.
     * @return user service provider
     * @throws IOException if an I/O error occurs
     */
    @Bean
    public IUserService userService() throws IOException {
        return new UserService(userDao());
    }
}
