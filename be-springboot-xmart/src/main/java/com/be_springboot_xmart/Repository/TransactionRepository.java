package com.be_springboot_xmart.Repository;

import com.be_springboot_xmart.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> {

}

