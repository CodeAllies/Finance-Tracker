package com.Tracker.expenseTracker.DAO;

import com.Tracker.expenseTracker.Entity.Expense;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ExpenseDAOImpl implements ExpenseDAO{

    private EntityManager entityManager;

    @Autowired
    ExpenseDAOImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public Expense find(int id) {
        return entityManager.find(Expense.class,id);
    }

    @Override
    public List<Expense> findAll() {
        return entityManager.createQuery("From Expense",Expense.class).getResultList();
    }

    @Transactional
    @Override
    public void save(Expense expense) {
        entityManager.persist(expense);
    }

    @Transactional
    @Override
    public void delete(int id) {
        entityManager.remove(entityManager.find(Expense.class,id));
    }

    @Transactional
    @Override
    public void update(Expense expense) {
        entityManager.merge(expense);
    }
}
