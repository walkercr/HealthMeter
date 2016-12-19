package honeydo.controllers;

import honeydo.dto.NewUserDto;
import honeydo.dto.UserDto;
import honeydo.exceptions.InternalServerException;
import honeydo.exceptions.UsernameExistsException;
import honeydo.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * User API controller.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 12/2/2016
 */
@RestController
public class UserController {

    /**
     * user service provider
     */
    private IUserService userService;

    /**
     * Creates a new UserController with the given service provider
     * @param userService user service provider
     */
    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    /**
     * Validates a user login
     * @param username the login username
     * @param password the login password
     * @return user data transfer object if credentials are valid,
     *     otherwise "unauthorized" error code
     */
    @RequestMapping(
            value = "/api/user",
            params = {"username", "password"},
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<UserDto> login(
            @RequestParam("username") String username,
            @RequestParam("password") String password
    ) {

        UserDto user = userService.getUser(username, password);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Returns all existing usernames.
     * @return existing usernames
     */
    @RequestMapping(
            value = "/api/user",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<List<String>> getUsernames() {
        return new ResponseEntity<>(userService.getUsernames(), HttpStatus.OK);
    }

    /**
     * Creates a new user on sign up.
     * @param newUserDto new user
     * @return created user dto
     */
    @RequestMapping(
            value = "/api/user",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<UserDto> signUp(@RequestBody NewUserDto newUserDto) {

        try {
            UserDto user = userService.createUser(newUserDto);
            System.out.println(user.getFirstName() + user.getLastName());
            return new ResponseEntity<>(user,
                                        HttpStatus.CREATED);

        } catch (UsernameExistsException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);

        } catch (InternalServerException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
