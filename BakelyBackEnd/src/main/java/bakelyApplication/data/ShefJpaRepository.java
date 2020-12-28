package bakelyApplication.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bakelyApplication.models.Shef;

@Repository
public interface ShefJpaRepository extends JpaRepository<Shef, Long>{
	
}
