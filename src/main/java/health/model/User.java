package health.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * User entity.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 12/2/2016
 */
@Entity
@Table(name = "User")
public class User {

    /* primary key */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    /* non-key columns */
    private String firstName;
    private String lastName;
    private String email;
    private Date dateOfBirth;
    private String gender;
    private String username;
    private String password;

    /**
     * Constructs an empty User.
     */
    public User() {}

    /**
     * Returns the user id.
     * @return user id
     */
    public int getUserId() {
        return userId;
    }

    /**
     * Sets the user id.
     * @param userId user id
     */
    public void setUserId(int userId) {
        this.userId = userId;
    }

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
     * Returns the user's date of birth.
     * @return date of birth
     */
    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    /**
     * Sets the user's date of birth.
     * @param dateOfBirth date of birth
     */
    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    /**
     * Returns the user's gender.
     * @return gender
     */
    public String getGender() {
        return gender;
    }

    /**
     * Sets the user's gender.
     * @param gender gender
     */
    public void setGender(String gender) {
        this.gender = gender;
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
