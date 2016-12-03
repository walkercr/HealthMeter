package health.controllers;

import health.dto.UserDto;
import health.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
     *     otherwise "forbidden" error code
     */
    @RequestMapping(
            value = "/api/user",
            params = {"username", "password"},
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> validateLogin(
            @RequestParam("username") String username,
            @RequestParam("password") String password
    ) {
        UserDto user = userService.getUser(username, password);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
