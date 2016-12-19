package honeydo.services;

import honeydo.dao.IUserDao;
import honeydo.dto.NewUserDto;
import honeydo.dto.UserDto;
import honeydo.exceptions.InternalServerException;
import honeydo.exceptions.UsernameExistsException;
import honeydo.model.User;

import java.util.List;

/**
 * User service implementation
 *
 * @author Craig Walker
 * @version 1.1
 * @since 12/2/2016
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
    @Override
    public UserDto getUser(String username, String password) {
        User user = userDao.getUser(username, password);
        return (user == null) ? null : new UserDto(user);
    }

    @Override
    public List<String> getUsernames() {
        return userDao.getUsernames();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserDto createUser(NewUserDto newUser)
            throws UsernameExistsException, InternalServerException {

        if (userDao.getIdByUsername(newUser.getUsername()) != null) {
            throw new UsernameExistsException();
        }

        User user = new User();
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setEmail(newUser.getEmail());
        user.setUsername(newUser.getUsername());
        user.setPassword(newUser.getPassword());

        Integer userId = userDao.insert(user);
        if (userId == null) {
            throw new InternalServerException();
        }
        user.setUserId(userId);

        return new UserDto(user);
    }
}
