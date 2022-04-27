<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    public function test_assert() {
        $this->assertEquals(42, 42);
    }
    public function test_temp_isvalid() {
        $temp_tracker = new TempTracker();
        $this->expectException(ValueError::class);
        $temp_tracker->insert(-1);
    }
    public function test_temp_type() {
        $temp_tracker = new TempTracker();
        $this->expectException(TypeError::class);
        $temp_tracker->insert('str');
    }
    public function test_array_elements_type() {
        $temp_tracker = new TempTracker();
        $this->expectException(TypeError::class);
        $temp_tracker->insert([1, 'str', 3]);
    }
    public function insert_temps() {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $temp_tracker->insert(2);
        $temp_tracker->insert(3);
        $temp_tracker->insert(4);
        $temp_tracker->insert(5);
        $temp_tracker->insert(6);
        $temp_tracker->insert(7);
        $temp_tracker->insert(8);
        $temp_tracker->insert(9);
        $temp_tracker->insert(10);
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], $temp_tracker->get_temps());
        $this->assertEquals(10, $temp_tracker->get_max());
        $this->assertEquals(1, $temp_tracker->get_min());
        $this->assertEquals(5.5, $temp_tracker->get_mean());
    }
    // les tests suivants ont été écrits pour tester les cas d'échec de tests comme les conditions dans /src/TempTracker.php ne seraient pas respectées
    // pour tester ces conditions, vous pouvez décommenter les lignes suivantes et lancer la commande de test

    /*
    public function test_insert_temps_with_empty_array() {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $temp_tracker->insert(2);
        $temp_tracker->insert(3);
        $temp_tracker->insert(4);
        $temp_tracker->insert(5);
        $temp_tracker->insert(6);
        $temp_tracker->insert(7);
        $temp_tracker->insert(8);
        $temp_tracker->insert(9);
        $temp_tracker->insert(10);
        $temp_tracker->insert([]);
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, []], $temp_tracker->get_temps());
        $this->assertEquals(10, $temp_tracker->get_max());
        $this->assertEquals(1, $temp_tracker->get_min());
        $this->assertEquals(5.5, $temp_tracker->get_mean());
    }
    public function test_insert_temps_with_strings() {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $temp_tracker->insert(2);
        $temp_tracker->insert(3);
        $temp_tracker->insert(4);
        $temp_tracker->insert(5);
        $temp_tracker->insert(6);
        $temp_tracker->insert(7);
        $temp_tracker->insert(8);
        $temp_tracker->insert(9);
        $temp_tracker->insert(10);
        $temp_tracker->insert('str');
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'str'], $temp_tracker->get_temps());
        $this->assertEquals(10, $temp_tracker->get_max());
        $this->assertEquals(1, $temp_tracker->get_min());
        $this->assertEquals(5.5, $temp_tracker->get_mean());
    }
    public function test_insert_temps_with_strings_as_array_element() {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $temp_tracker->insert(2);
        $temp_tracker->insert(3);
        $temp_tracker->insert(4);
        $temp_tracker->insert(5);
        $temp_tracker->insert(6);
        $temp_tracker->insert(7);
        $temp_tracker->insert(8);
        $temp_tracker->insert(9);
        $temp_tracker->insert(10);
        $temp_tracker->insert(['str']);
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ['str']], $temp_tracker->get_temps());
        $this->assertEquals(10, $temp_tracker->get_max());
        $this->assertEquals(1, $temp_tracker->get_min());
        $this->assertEquals(5.5, $temp_tracker->get_mean());
    }
    */
}