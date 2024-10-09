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
@Table(name = "customer")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer implements Serializable {

    @Id
    @NotNull
    @Column(name = "qrcode")
    private String qrCode;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "wallet")
    private BigDecimal wallet;
}