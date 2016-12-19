package honeydo.services;

import honeydo.dto.NewUserDto;
import honeydo.dto.UserDto;
import honeydo.exceptions.InternalServerException;
import honeydo.exceptions.UsernameExistsException;

import java.util.List;

/**
 * User service interface
 *
 * @author Craig Walker
 * @version 1.1
 * @since 12/2/2016
 */
public interface IUserService {

    /**
     * Returns the user id of the user with the given credentials.
     * @param username username
     * @param password password
     * @return user with given credentials if the user exists, otherwise null
     */
    UserDto getUser(String username, String password);

    List<String> getUsernames();

    /**
     * Creates a new user.
     * @param newUser new user
     * @return data transfer object of the created user
     * @throws UsernameExistsException if the username already exists
     * @throws InternalServerException if a server error occurs
     */
    UserDto createUser(NewUserDto newUser)
            throws UsernameExistsException, InternalServerException;
}
