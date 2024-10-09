package com.be_springboot_xmart.Model;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name = "product")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product implements Serializable {
    @Id
    @NotNull
    @Column(name = "rfid")
    private String rfid;

    @NotNull
    @Column(name = "product_name")
    private String productName;

    @NotNull
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
}