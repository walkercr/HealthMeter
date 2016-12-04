package health.dao;

import health.model.User;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;

/**
 * Data access object implementation for User table.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 12/2/2016
 */
public class UserDao implements IUserDao {

    /**
     * database session factory
     */
    private final SessionFactory sessionFactory;

    /**
     * Constructs a new UserDao with the given database session factory.
     * @param sessionFactory database session factory
     */
    public UserDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public User getUser(String username, String password) {
        try {
            @SuppressWarnings("JpaQlInspection")
            String hql = "select u from User u "
                        + "where u.username = :username "
                        + "and u.password = :password";
            Query query = sessionFactory.getCurrentSession().createQuery(hql);
            query.setParameter("username", username);
            query.setParameter("password", password);
            return (User) query.uniqueResult();

        } catch (Exception e) {
            // log exception
            return null;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public Integer insert(User user) {
        try {
            return (Integer) sessionFactory.getCurrentSession().save(user);
        } catch (Exception e) {
            // log exception
            return null;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public boolean delete(int userId) {
        try {
            @SuppressWarnings("JpaQlInspection")
            String hql = "delete User u where u.userId = :userId";
            Query query = sessionFactory.getCurrentSession()
                    .createQuery(hql)
                    .setParameter("userId", userId);
            query.executeUpdate();
            return true;

        } catch (Exception e) {
            // log exception
            return false;
        }
    }
}
