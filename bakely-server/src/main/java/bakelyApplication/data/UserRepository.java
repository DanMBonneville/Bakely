package bakelyApplication.data;

import org.springframework.data.jpa.repository.JpaRepository;

import bakelyApplication.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
}