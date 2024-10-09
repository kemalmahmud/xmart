package com.be_springboot_xmart.Repository;

import com.be_springboot_xmart.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String> {

}