package health.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

    /**
     * userId column (primary key)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

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
}
