package com.be_springboot_xmart.Repository;

import com.be_springboot_xmart.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {

}
