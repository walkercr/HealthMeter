package health.services;

import health.dao.IUserDao;
import health.dto.UserDto;
import health.model.User;

/**
 * User service implementation
 *
 * @author Craig Walker
 * @version 1.1
 * @since 12/22016
 */
public class UserService implements IUserService {
    /**
     * Data access object for the User table
     */
    private IUserDao userDao;

    /**
     * Constructs a new UserService with the given data access object.
     * @param userDao data access object for the User table
     */
    public UserService(IUserDao userDao) {
        this.userDao = userDao;
    }

    /**
     * Returns the user id of the user with the given credentials.
     * @param username username
     * @param password password
     * @return user with given credentials if the user exists, otherwise null
     */
    public UserDto getUser(String username, String password) {
        User user = userDao.getUser(username, password);
        if (user == null) {
            return null;
        }
        return new UserDto();
    }
}
