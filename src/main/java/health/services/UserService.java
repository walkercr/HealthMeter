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
     * {@inheritDoc}
     */
    public UserDto getUser(String username, String password) {
        User user = userDao.getUser(username, password);
        return (user == null) ? null : new UserDto();
    }
}
