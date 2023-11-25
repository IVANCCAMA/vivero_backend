CREATE OR REPLACE FUNCTION actualizar_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.cantidad_ingreso > 0 THEN    
            -- Si cantidad_ingreso_salida es mayor que 0, se suma al stock_actual
            UPDATE producto
            SET stok_actual_producto = stok_actual_producto + NEW.cantidad_ingreso
            WHERE id_producto = NEW.id_producto;
        ELSIF NEW.cantidad_salida > 0 THEN
            -- Si cantidad_ingreso_salida es mayor que 0, se resta al stock_actual
            UPDATE producto
            SET stok_actual_producto = stok_actual_producto - NEW.cantidad_salida
            WHERE id_producto = NEW.id_producto;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        -- Verifica si la fila que se está eliminando es una entrada o salida y ajusta el stock
        IF OLD.cantidad_ingreso > 0 THEN
            UPDATE producto
            SET stok_actual_producto = stok_actual_producto - OLD.cantidad_ingreso
            WHERE id_producto = OLD.id_producto;
        ELSIF OLD.cantidad_salida > 0 THEN
            UPDATE producto
            SET stok_actual_producto = stok_actual_producto + OLD.cantidad_salida
            WHERE id_producto = OLD.id_producto;
        END IF;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_stock
AFTER INSERT OR DELETE ON transaccion
FOR EACH ROW
EXECUTE FUNCTION actualizar_stock();
