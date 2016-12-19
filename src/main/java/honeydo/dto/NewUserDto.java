package honeydo.dto;

import honeydo.model.User;

/**
 * New user data transfer object.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 12/17/2016
 */
public class NewUserDto {

    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;

    /**
     * Returns the first name of the user.
     * @return first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name of the user.
     * @param firstName first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Returns the last name of the user.
     * @return last name
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name of the user.
     * @param lastName last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Returns the user's email address.
     * @return email address
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the user's email address.
     * @param email email address
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Returns the user's username.
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Sets the user's username.
     * @param username username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Returns the user's password.
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the user's password.
     * @param password password
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
