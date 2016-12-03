package health.services;

import health.dto.UserDto;

/**
 * User service interface
 *
 * @author Craig Walker
 * @version 1.1
 * @since 12/22016
 */
public interface IUserService {

    /**
     * Returns the user id of the user with the given credentials.
     * @param username username
     * @param password password
     * @return user with given credentials if the user exists, otherwise null
     */
    UserDto getUser(String username, String password);
}
