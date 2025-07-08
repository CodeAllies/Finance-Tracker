package com.example.financeTracker.Finance.Tracker.DAO;

import com.example.financeTracker.Finance.Tracker.Entity.Expense;

import java.util.*;

public interface ExpenseDAO {

    Expense find(int id);

    List<Expense> findAll();

    void save(Expense expense);

    void delete(int id);

    void update(Expense expense);
}
