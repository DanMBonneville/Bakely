package bakelyApplication.data;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import bakelyApplication.models.Shef;

@Repository
@Transactional
public class ShefJpaRepository {

	@PersistenceContext
	EntityManager entityManger;

	public Shef findByUserName(String userName) {
		return entityManger.find(Shef.class, userName);
	}
}
