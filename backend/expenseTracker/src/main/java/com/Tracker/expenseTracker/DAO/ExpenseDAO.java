package com.Tracker.expenseTracker.DAO;

import com.Tracker.expenseTracker.Entity.Expense;
import java.util.*;

public interface ExpenseDAO {

    Expense find(int id);

    List<Expense> findAll();

    void save(Expense expense);

    void delete(int id);

    void update(Expense expense);
}
