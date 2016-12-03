package health.dao;

import health.model.User;

/**
 * Data access object interface for User table.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 12/2/2016
 */
public interface IUserDao {

    /**
     * Returns the user with the given credentials.
     * @param username username
     * @param password password
     * @return user with given credentials if the user exists, otherwise null
     */
    User getUser(String username, String password);

    /**
     * Inserts the given user into the User table.
     * @param user user to be inserted
     * @return the user id of the inserted User on success, null on error
     */
    Integer insert(User user);

    /**
     * Deletes the user with the given id from the User table.
     * @param userId user id of user to be deleted
     * @return true if delete is successful, otherwise false
     */
    boolean delete(int userId);
}
