package honeydo.dao;

import honeydo.model.User;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Override
    @Transactional
    public Integer getIdByUsername(String username) {

        @SuppressWarnings("JpaQlInspection")
        String hql = "select u.userId from User u where u.username = :username";
        Query query = sessionFactory.getCurrentSession().createQuery(hql)
                                    .setParameter("username", username);
        return (Integer) query.uniqueResult();
    }

    @Override
    @Transactional
    public List<String> getUsernames() {

        @SuppressWarnings("JpaQlInspection")
        String hql = "select u.username from User u";
        Query query = sessionFactory.getCurrentSession().createQuery(hql);

        @SuppressWarnings("unchecked")
        List<String> usernames = query.list();

        return usernames;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public Integer insert(User user) {
        return (Integer) sessionFactory.getCurrentSession().save(user);
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
