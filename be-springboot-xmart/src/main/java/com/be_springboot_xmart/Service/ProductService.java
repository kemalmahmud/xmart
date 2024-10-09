package com.be_springboot_xmart.Service;

import com.be_springboot_xmart.Dto.ProductRequestDto;
import com.be_springboot_xmart.Dto.ProductResponseDto;
import com.be_springboot_xmart.Model.Product;
import com.be_springboot_xmart.Repository.ProductRepository;
import com.be_springboot_xmart.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ProductResponseDto findById(String id) {
        var res = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found."));

        return ProductResponseDto.builder().rfid(res.getRfid()).productName(res.getProductName()).unitPrice(res.getUnitPrice()).build();
    }

    public List<ProductResponseDto> findAll() {
        var prodList =  productRepository.findAll();
        var res = new ArrayList<ProductResponseDto>();

        prodList.forEach(product -> {
            ProductResponseDto prod = new ProductResponseDto();
            prod.setRfid(product.getRfid());
            prod.setProductName(product.getProductName());
            prod.setUnitPrice(product.getUnitPrice());
            res.add(prod);
        });

        return res;
    }

    public ProductResponseDto create(ProductRequestDto product) {
        Product prod = new Product();
        prod.setRfid(UUID.randomUUID().toString());
        prod.setProductName(product.getProductName());
        prod.setUnitPrice(product.getUnitPrice());
        var res = productRepository.save(prod);

        return ProductResponseDto.builder().rfid(res.getRfid()).productName(res.getProductName()).unitPrice(res.getUnitPrice()).build();
    }

    public ProductResponseDto edit(ProductRequestDto product) {
        var prod = productRepository.findById(product.getRfid())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found."));

        prod.setProductName(product.getProductName());
        prod.setUnitPrice(product.getUnitPrice());

        var res = productRepository.save(prod);

        return ProductResponseDto.builder().rfid(res.getRfid()).productName(res.getProductName()).unitPrice(res.getUnitPrice()).build();
    }

    public void deleteById(String id) {
        productRepository.deleteById(id);
    }
}
