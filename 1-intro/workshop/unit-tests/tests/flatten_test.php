<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_flatten_error_null()
{
    $this->expectException(TypeError::class);
    $array = null;
    flatten($array);
}
    public function test_flattening_strings()
{
    $this->expectException(TypeError::class);
    $array = 'String';
    flatten($array);
}
    public function test_flatten_isempty()
{
    $array = [];
    $this->assertEquals([], flatten($array));
    echo 'the array is empty';
}
    public function test_assert_equal()
{
    $this->assertEquals(1, 1);
    $array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], flatten($array));
}
public function test_flattening_nested()
{
    $array = [1, 2, 4, 5, 6, [7, 8, 9], 10, [11, 12, [13, 14, [15, 16]]]];
    $this->assertEquals([1, 2,  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], flatten($array));
}
public function test_flattening_nested_and_empty()
{
    $array = [1, 2, 3, 4, 5, 6, [7, 8, 9], 10, [11, 12, [13, 14, [15, 16]]], []];
    $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], flatten($array));
}
public function test_flattening_nested_and_empty_and_strings()
{
    $array = [1, 2, 3, 4, 5, 6, [7, 8, 9], 10, [11, 12, [13, 14, [15, 16]]], [], 'string'];
    $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'string'], flatten($array));

}
public function test_flattening_nested_and_empty_and_strings_and_null()
{
    $array = [1, 2, 3, 4, 5, 6, [7, 8, 9], 10, [11, 12, [13, 14, [15, 16]]], [], 'string', null];
    $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 'string', null], flatten($array));

}

}